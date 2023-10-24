const pickr = Pickr.create({
	el: ".color-picker",
	theme: "nano", // or 'monolith', or 'nano'

	swatches: [
		"rgba(244, 67, 54, 1)",
		"rgba(233, 30, 99, 0.95)",
		"rgba(156, 39, 176, 0.9)",
		"rgba(103, 58, 183, 0.85)",
		"rgba(63, 81, 181, 0.8)",
		"rgba(33, 150, 243, 0.75)",
	],

	components: {
		// Main components
		preview: true,
		opacity: true,
		hue: true,

		// Input / output Options
		interaction: {
			hex: true,
			rgba: true,
			hsla: false,
			hsva: false,
			cmyk: false,
			input: true,
			clear: true,
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
	});
