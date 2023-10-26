const pickr = Pickr.create({
	el: ".color-picker",
	theme: "nano", // or 'monolith', or 'nano'

	components: {
		// Main components
		preview: true,
		opacity: true,
		hue: true,

		// Input / output Options
		interaction: {
			input: true,
			save: true,
		},
	},
});

pickr
	.on("change", (color, source, instance) => {
		const rgbaColor = color.toRGBA().toString();
	})
	.on("save", (color, instance) => {
		const rgbaColorSave = color.toRGBA().toString();
		document.documentElement.style.setProperty('--mainColor', rgbaColorSave);
		document.querySelector("body").style.backgroundColor = `var(--mainColor)`;
		localStorage.setItem("bgColor", rgbaColorSave);
	});

document.addEventListener("DOMContentLoaded", function () {
	const loadBgColor = localStorage.getItem("bgColor");
	document.documentElement.style.setProperty('--mainColor', loadBgColor);
	document.querySelector("body").style.backgroundColor = `var(--mainColor)`;
});
