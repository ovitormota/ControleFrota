import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { globalStyles } from "../styles/globalStyles";
import { Question } from "../types/types";

interface QuestionListProps {
  questions: Question[];
  onPress: (question: Question) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onPress,
}) => {
  return (
    <FlatList
      data={questions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.questionItem}>
          <Text>
            <Text style={globalStyles.boldText}>Pergunta: </Text>
            {item.question}
          </Text>
          <Text>
            <Text style={globalStyles.boldText}>Resposta Correta: </Text>
            {item.right_answer}
          </Text>
          <Text>
            <Text style={globalStyles.boldText}>Possui Observação: </Text>
            {item.has_observation ? "Sim" : "Nao"}
          </Text>

          <TouchableOpacity
            style={globalStyles.submitButton}
            onPress={() => onPress(item)}
          >
            <Text style={globalStyles.submitButtonText}>Responder</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  questionItem: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
