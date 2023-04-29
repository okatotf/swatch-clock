const { Clutter, St } = imports.gi;
const Main = imports.ui.main;

function getSwatchTime() {
    const date = new Date();
    const [hours, minutes, seconds, milliseconds] = [
        (date.getUTCHours() + 1) % 24,
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    ];
    const timeInMilliseconds = ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
    const millisecondsPerBeat = 86400;
    const swatchTime = Math.abs(timeInMilliseconds / millisecondsPerBeat);
    return `@${swatchTime.toFixed(2)}`;
}

class Extension {
    constructor() {
        this._label = null;
        this._updateInterval = null;
    }

    enable() {
        this._label = new St.Label({
            y_align: Clutter.ActorAlign.CENTER
        });
        Main.panel._centerBox.insert_child_at_index(this._label, 1);

        this._updateInterval = setInterval(() => {
            this._label.set_text(getSwatchTime());
        }, 864);
    }

    disable() {
        clearInterval(this._updateIntervalId);
        Main.panel._centerBox.remove_child(this._label);
        this._label.destroy();
        this._label = null;
    }
}

function init() {
    return new Extension();
}