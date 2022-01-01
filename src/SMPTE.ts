/**
 * Enum containng an easy to access list of
 * all valid Framrates
 * @public
 */
export enum Framerate {
    F2397 = 23.976,
    F24 = 24,
    F25 = 25,
    F2997 = 29.97,
    F30 = 30,
    F50 = 50,
    F5994 = 59.94,
    F60 = 60,
    F1000 = 1000
}
/**
 * @public
 */
export enum Offset {
    NONE = "",
    START = "+",
    END = "-"
}

const generateMaxFrameCount = (): Map<Framerate, number> => {
    const map: Map<Framerate, number> = new Map<Framerate, number>();
    Object.values(Framerate).forEach((value: string | Framerate) => {
        map.set(value as Framerate, calcMaxFrameCount(value as Framerate));
    });
    return map;
};

const calcMaxFrameCount = (frameRate: Framerate): number => {
    return (23 * 3600 + 59 * 60 + 59) * Math.round(frameRate) + frameRate;
};

const MaxFrameCount: Map<Framerate, number> = generateMaxFrameCount();

/**
 * SMPTE with support for offset time
 * @public
 */
export class SMPTE {
    constructor(
        timecode?: number | string | SMPTE | Date,
        frameRate: number = Framerate.F25,
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
        if (typeof timecode === "string") {
            if (timecode === "--:--:--:--") {
                this.mHours = -1;
                this.mMinutes = -1;
                this.mSeconds = -1;
                this.mFrames = -1;
            } else {
                const parts = (timecode as String).match(
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
            if (timecode >= 0) {
                this.mFrameCount = timecode;
                this.mHours = -1;
                this.mMinutes = -1;
                this.mSeconds = -1;
                this.mFrames = -1;
                this.calculateTimeCode();
            } else {
                let max = MaxFrameCount.get(this.frameRate()) as number;
                if (this.dropFrame()) {
                    const totalMinutes = 23 * 60 + 59;
                    const df = this.frameRate() === Framerate.F2997 ? 2 : 4;
                    max -= df * (totalMinutes - Math.floor(totalMinutes / 10));
                }
                this.mFrameCount = max - Math.abs(timecode);
                this.mHours = -1;
                this.mMinutes = -1;
                this.mSeconds = -1;
                this.mFrames = -1;
                this.calculateTimeCode();
            }
        } else if (timecode === undefined) {
            this.mFrameCount = -1;
            this.mHours = -1;
            this.mMinutes = -1;
            this.mSeconds = -1;
            this.mFrames = -1;
        } else {
            throw new Error(
                "Timecode() constructor expects a number, timecode string, or Date()"
            );
        }

        this.validate();
    }

    greaterThanOrEqual(other: SMPTE): boolean {
        return this.valueOf() >= this.convert(other).valueOf();
    }

    equals(other: SMPTE): boolean {
        return this.valueOf() === this.convert(other).valueOf();
    }

    add(other: SMPTE): SMPTE {
        return new SMPTE(
            this.valueOf() + this.convert(other).valueOf(),
            this.frameRate()
        );
    }

    subtract(other: SMPTE): SMPTE {
        return new SMPTE(
            this.valueOf() - this.convert(other).valueOf(),
            this.frameRate()
        );
    }

    toString(): string {
        if (this.frameCount() === -1) return "--:--:--";
        const zeroPad = (num: number, places: number): string => {
            return String(Math.floor(num)).padStart(places, "0");
        };
        return `${this.mOffset}${zeroPad(this.hours(), 2)}:${zeroPad(
            this.minutes(),
            2
        )}:${zeroPad(this.seconds(), 2)}${
            this.dropFrame() ? ";" : ":"
        }${zeroPad(this.frames(), 2)}`;
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

    /**
     * @remarks
     * This is not the proper way to convert as it disregards frames
     * but it's quick and dirty and currently we don't need frames.
     *
     * @param other - The SMPTE to convert
     * @returns The converted SMPTE
     */
    private convert(other: SMPTE): SMPTE {
        const convert = new SMPTE(other);
        convert.mFrameRate = this.frameRate();
        convert.mDropFrame = this.dropFrame();
        convert.calculateFrameCount();
        return convert;
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
            this.mFrameCount -=
                df * (totalMinutes - Math.floor(totalMinutes / 10));
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

export const INVALID: SMPTE = new SMPTE();

export default { SMPTE, Offset, Framerate };
