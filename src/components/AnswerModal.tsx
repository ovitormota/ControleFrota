import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface AnswerModalProps {
  visible: boolean;
  question: string;
  hasObservation: boolean;
  onClose: () => void;
  onSubmit: (answer: string, observation: string) => void;
}

export const AnswerModal: React.FC<AnswerModalProps> = ({
  visible,
  question,
  hasObservation,
  onClose,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [observation, setObservation] = useState<string>("");

  const handleSubmit = () => {
    if (answer) {
      onSubmit(answer, observation);
      setAnswer(null);
      setObservation("");
      onClose();
    }
  };

  const handleCancel = () => {
    setAnswer(null);
    setObservation("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{question}</Text>
          <View style={styles.answerContainer}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                answer === "Sim" && styles.selectedAnswerButton,
              ]}
              onPress={() => setAnswer("Sim")}
            >
              <MaterialIcons
                name="check-circle"
                size={40}
                color={answer === "Sim" ? "#2ecc71" : "#ccc"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.answerButton,
                answer === "Não" && styles.selectedAnswerButtonNot,
              ]}
              onPress={() => setAnswer("Não")}
            >
              <MaterialIcons
                name="cancel"
                size={40}
                color={answer === "Não" ? "#e74c3c" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
          {hasObservation && (
            <View>
              <Text style={styles.modalTitle}>Observação</Text>
              <TextInput
                style={styles.observationInput}
                placeholder="Digite sua observação..."
                value={observation}
                onChangeText={setObservation}
                multiline
              />
            </View>
          )}

          <TouchableOpacity
            style={
              !answer || (hasObservation && observation === "")
                ? globalStyles.submitButtonDisabled
                : globalStyles.submitButton
            }
            onPress={handleSubmit}
            disabled={!answer || (hasObservation && observation === "")}
          >
            <Text style={globalStyles.submitButtonText}>Enviar Resposta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.closeButton}
            onPress={handleCancel}
          >
            <Text style={globalStyles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  answerButton: {
    padding: 10,
  },
  observationInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  selectedAnswerButton: {
    backgroundColor: "rgba(46, 204, 113, 0.2)",
    borderRadius: 50,
  },
  selectedAnswerButtonNot: {
    backgroundColor: "rgba(231, 76, 60, 0.2)",
    borderRadius: 50,
  },
});
