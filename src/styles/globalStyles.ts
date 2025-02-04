import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  closeButton: {
    borderColor: "#e74c3c",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },

  submitButton: {
    backgroundColor: "#04AA6D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
