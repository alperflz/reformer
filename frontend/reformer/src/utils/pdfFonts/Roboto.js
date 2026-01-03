// utils/pdfFonts/Roboto.js
import robotoBase64 from "./RobotoBase64.txt?raw";

export const registerRoboto = (doc) => {
  doc.addFileToVFS("Roboto.ttf", robotoBase64);
  doc.addFont("Roboto.ttf", "Roboto", "normal");
  doc.setFont("Roboto");
};
