export default {
textFilter : {label: 'Text Filter (regex)', type: 'text', val: "."},
 fontSize : {label: "Font size", model: "fontSize",  min: 5, max: 50, val: 13},
 connectorWidth : {label: 'Connector width', model: "connectorWidth", min: 20, max: 100, val: 65},
 connectorSteepness : {label: 'Connector steepness', min: 0.1, max:1, step:0.01, val: 0.65},
 connectorLineWidth : {label: 'Line width', min: 0.5, max: 10, step: 0.25, val: 4.5},
 nodeMarginTop : {label:' Top margin', min: 0, max: 50, val: 5},
 nodeMarginBottom : {label:' Bottom margin', min: 0, max: 50, val: 5},
 useGrayscale : {label: 'Use grayscale', type: 'boolean', val: 0},
}