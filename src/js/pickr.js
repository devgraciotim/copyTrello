const pickr = Pickr.create({
	el: ".color-picker",
	theme: "nano", // or 'monolith', or 'nano'

	swatches: [
		"#0015FF",
		"#FF0000",
		"#E9FF00",
		"#00FF16",
		"#FF00D3",
		"#FF8100",
		"#00D4FF",
	],

	components: {
		// Main components
		preview: true,
		opacity: true,
		hue: true,

		// Input / output Options
		interaction: {
			hex: false,
			rgba: false,
			hsla: false,
			hsva: false,
			cmyk: false,
			input: true,
			clear: false,
			save: true,
		},
	},
});

pickr
	.on("change", (color, source, instance) => {
		const rgbaColor = color.toRGBA().toString();
		console.log(rgbaColor);
	})
	.on("save", (color, instance) => {
		const rgbaColorSave = color.toRGBA().toString();
		console.log(rgbaColorSave);
		document.querySelector("body").style.backgroundColor = rgbaColorSave;
		localStorage.setItem("bgColor", rgbaColorSave);
	});

document.addEventListener("DOMContentLoaded", function () {
	const loadBgColor = localStorage.getItem("bgColor");
	document.querySelector("body").style.backgroundColor = loadBgColor;
	document.querySelector("color-picker").style.backgroundColor = loadBgColor;
});
