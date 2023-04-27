/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

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
        this._label = new St.Label({
            y_align: Clutter.ActorAlign.CENTER
        });
        this._updateInterval = null;
    }

    enable() {
        Main.panel._centerBox.insert_child_at_index(this._label, 1);
        
        this._updateInterval = setInterval(() => {
            this._label.set_text(getSwatchTime());
        }, 864);
    }

    disable() {
        Main.panel._centerBox.remove_child(this._label);
        clearInterval(this._updateIntervalId);
    }
}

function init() {
    return new Extension();
}
