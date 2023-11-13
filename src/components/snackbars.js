import Snackbar from "awesome-snackbar";

const snackMessageTemplate = (message, icon) =>
  `
    <div style="display: flex; justify-content: space-between; gap: 1em; margin: 0.2em 0; align-items: center;">
      <span>${icon}</span>
      <p>${message}</p>
    </div>
  `;

const snackDefaultSettings = (color) => ({
  position: "bottom-center",
  timeout: 1800,
  style: {
    container: [["border-left", `6px solid ${color}`]],
    message: [["line-height", "1em"]],
  },
});

export const errorSnackBar = (message) => {
  new Snackbar(
    snackMessageTemplate(message, "❌"),
    snackDefaultSettings("#DC343B")
  );
};

export const warningSnackBar = (message) => {
  new Snackbar(
    snackMessageTemplate(message, "⚠"),
    snackDefaultSettings("#ffd400")
  );
};

export const infoSnackBar = (message) => {
  new Snackbar(
    snackMessageTemplate(message, "ℹ"),
    snackDefaultSettings("#007cb7")
  );
};

export const successSnackBar = (message) => {
  new Snackbar(
    snackMessageTemplate(message, "✅"),
    snackDefaultSettings("#39a845")
  );
};
