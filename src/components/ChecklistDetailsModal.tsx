import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchCustomChecklistDetails } from "../services/api";
import { globalStyles } from "../styles/globalStyles";
import { Checklist, Question } from "../types/types";
import { QuestionList } from "./QuestionList";

interface ChecklistDetailsModalProps {
  visible: boolean;
  checklist: Checklist | null;
  onClose: () => void;
  onQuestionPress: (question: Question) => void;
}

const CHECKLIST_TYPE = "Personalizado";

export const ChecklistDetailsModal: React.FC<ChecklistDetailsModalProps> = ({
  visible,
  checklist,
  onClose,
  onQuestionPress,
}) => {
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!checklist) return;

    const fetchDetails = async () => {
      if (checklist.checklist_config?.name === CHECKLIST_TYPE) {
        setLoading(true);
        try {
          const checklistDetails: string[] = await fetchCustomChecklistDetails(checklist.id);
          if (checklistDetails) setDays(checklistDetails);
        } catch (error) {
          console.error("Erro ao buscar detalhes do checklist:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setDays([]);
      }
    };

    fetchDetails();
  }, [checklist]);

  return (
    <Modal visible={visible && checklist !== null} animationType="slide">
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContent}>
          {checklist && (
            <Text style={globalStyles.modalTitle}>{checklist.name}</Text>
          )}

          <QuestionList
            key={checklist?.id}
            questions={checklist?.question || []}
            onPress={onQuestionPress}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#084b6f"
              style={{ marginTop: 20 }}
            />
          ) : (
            days.length > 0 && (
              <View>
                <Text style={globalStyles.modalTitle}>Dias do Checklist:</Text>
                <FlatList
                  data={days}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Text>
                      <Text style={globalStyles.boldText}>• </Text>
                      {item}
                    </Text>
                  )}
                />
              </View>
            )
          )}

          <TouchableOpacity style={globalStyles.closeButton} onPress={onClose}>
            <Text style={globalStyles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
