/**
 * Enum containng an easy to access list of
 * all valid Framrates
 */
const enum Framerate {
  F2397 = 23.976,
  F24 = 24,
  F25 = 25,
  F2997 = 29.97,
  F30 = 30,
  F50 = 50,
  F5994 = 59.94,
  F60 = 60,
  F1000 = 1000,
}

export const enum Offset {
  NONE = "",
  START = "+",
  END = "-",
}

/**
   * SMPTE with support for offset time
   */
export class SMPTE {
  constructor(
    timecode: number | String | SMPTE | Date,
    frameRate: number = Framerate.F2997,
    dropFrame: boolean = !!(
      frameRate === Framerate.F2997 || frameRate === Framerate.F5994
    ),
    offset: Offset = Offset.NONE
  ) {
    this.mFrameRate = frameRate;
    if (!this.validateFrameRate()) throw new Error("Unsupported framerate");
    this.mDropFrame = dropFrame;
    this.mOffset = offset;
    this.mFrameCount = 0;
    if (timecode instanceof String || typeof timecode === "string") {
      if (timecode === "--:--:--:--") {
        this.mHours = -1;
        this.mMinutes = -1;
        this.mSeconds = -1;
        this.mFrames = -1;
      } else {
        const parts = timecode.match(
          "^(\\+|\\-)?([012][0-9]):([0-9][0-9]):([0-9][0-9])(:|;|\\.)([0-9][0-9])$"
        );
        if (!parts) {
          throw new Error(
            "Timecode string expected as (+-)HH:MM:SS:FF or (+-)HH:MM:SS;FF"
          );
        }
        this.mOffset = (parts[1] as Offset) || Offset.NONE;
        this.mHours = parseInt(parts[2]);
        this.mMinutes = parseInt(parts[3]);
        this.mSeconds = parseInt(parts[4]);
        if (!this.dropFrame()) this.mDropFrame = parts[5] !== ":";
        this.mFrames = parseInt(parts[6]);
        this.calculateFrameCount();
      }
    } else if (timecode instanceof Date) {
      this.mHours = timecode.getHours();
      this.mMinutes = timecode.getMinutes();
      this.mSeconds = timecode.getSeconds();
      this.mFrames = timecode.getMilliseconds();
      this.mFrameRate = Framerate.F1000;
      this.mDropFrame = false;
      this.calculateFrameCount();
    } else if (timecode instanceof SMPTE) {
      this.mHours = timecode.hours();
      this.mMinutes = timecode.minutes();
      this.mSeconds = timecode.seconds();
      this.mFrames = timecode.frames();
      this.mFrameRate = timecode.frameRate();
      this.mDropFrame = timecode.dropFrame();
      this.mFrameCount = timecode.frameCount();
    } else if (typeof timecode === "number") {
      this.mFrameCount = timecode;
      this.mHours = -1;
      this.mMinutes = -1;
      this.mSeconds = -1;
      this.mFrames = -1;
      this.calculateTimeCode();
    } else {
      throw new Error(
        "Timecode() constructor expects a number, timecode string, or Date()"
      );
    }

    this.validate();
  }

  toString(): string {
    if (this.frameCount() === -1) return "--:--:--";
    const zeroPad = (num: number, places: number): string => {
      return String(Math.floor(num)).padStart(places, "0");
    };
    return `${this.mOffset}${zeroPad(this.hours(), 2)}:${zeroPad(
      this.minutes(),
      2
    )}:${zeroPad(this.seconds(), 2)}${this.dropFrame() ? ";" : ":"}${zeroPad(
      this.frames(),
      2
    )}`;
  }

  valueOf(): number {
    return this.offset() === Offset.END
      ? -this.frameCount()
      : this.frameCount();
  }

  hours(): number {
    return this.mHours;
  }

  minutes(): number {
    return this.mMinutes;
  }

  seconds(): number {
    return this.mSeconds;
  }

  frames(): number {
    return this.mFrames;
  }

  frameCount(): number {
    return this.mFrameCount;
  }

  frameRate(): number {
    return this.mFrameRate;
  }

  dropFrame(): boolean {
    return this.mDropFrame;
  }

  offset(): Offset {
    return this.mOffset;
  }

  private calculateTimeCode(): void {
    if (this.frameCount() === -1) return;
    let fc = this.frameCount();
    if (this.dropFrame()) {
      const df = this.frameRate() === Framerate.F2997 ? 2 : 4;
      const d = this.frameCount() / ((17982 * df) / 2);
      let m = this.frameCount() % ((17982 * df) / 2);
      if (m < df) m = m + df;
      fc += 9 * df * d + df * Math.floor((((m - df) / 1798) * df) / 2);
    }
    const fps = Math.round(this.frameRate());
    this.mFrames = fc % fps;
    this.mSeconds = Math.floor(fc / fps) % 60;
    this.mMinutes = Math.floor(fc / (fps * 60)) % 60;
    this.mHours = Math.floor(fc / (fps * 3600)) % 24;
  }

  private calculateFrameCount(): void {
    this.mFrameCount =
      (this.hours() * 3600 + this.minutes() * 60 + this.seconds()) *
        Math.round(this.frameRate()) +
      this.frames();

    if (this.dropFrame()) {
      const totalMinutes = this.hours() * 60 + this.minutes();
      const df = this.frameRate() === Framerate.F2997 ? 2 : 4;
      this.mFrameCount -= df * (totalMinutes - Math.floor(totalMinutes / 10));
    }
  }

  private validateFrameRate(): boolean {
    return (
      this.frameRate() === Framerate.F2397 ||
      this.frameRate() === Framerate.F24 ||
      this.frameRate() === Framerate.F25 ||
      this.frameRate() === Framerate.F2997 ||
      this.frameRate() === Framerate.F30 ||
      this.frameRate() === Framerate.F50 ||
      this.frameRate() === Framerate.F5994 ||
      this.frameRate() === Framerate.F60 ||
      this.frameRate() === Framerate.F1000
    );
  }

  private validate(): void {
    if (
      this.dropFrame() &&
      this.frameRate() !== Framerate.F2397 &&
      this.frameRate() !== Framerate.F2997 &&
      this.frameRate() !== Framerate.F5994
    ) {
      throw new Error(
        "Drop frame is only supported for 23.976,29.97 and 59.94 fps"
      );
    }
    if (
      this.hours() > 23 ||
      this.minutes() > 59 ||
      this.seconds() > 59 ||
      this.frames() >= this.frameRate()
    )
      throw new Error("Invalid timecode " + JSON.stringify(this));
  }

  private mHours: number;
  private mMinutes: number;
  private mSeconds: number;
  private mFrames: number;
  private mFrameRate: number;
  private mDropFrame: boolean;
  private mOffset: Offset;
  private mFrameCount: number;
}

export const INVALID: SMPTE = new SMPTE(-1);

export default SMPTE;
