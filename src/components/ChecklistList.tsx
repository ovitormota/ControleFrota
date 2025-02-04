import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Checklist } from "../types/types";

interface ChecklistListProps {
  checklists: Checklist[];
  onPress: (checklist: Checklist) => void;
}

export const ChecklistList: React.FC<ChecklistListProps> = ({
  checklists,
  onPress,
}) => {
  return (
    <FlatList
      data={checklists}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item)}>
          <View style={styles.checklistItem}>
            <View>
              <Text>
                <Text style={globalStyles.boldText}>Nome: </Text>
                {item.name}
              </Text>
              <Text>
                <Text style={globalStyles.boldText}>Perguntas: </Text>
                {item.question.length}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.truncatedText}
              >
                <Text style={globalStyles.boldText}>Tipo: </Text>
                {item.checklist_config.name}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="eye-arrow-right"
              size={24}
              color="#084b6f"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  checklistItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  truncatedText: {
    maxWidth: '100%',
    fontSize: 16,
  },
});
