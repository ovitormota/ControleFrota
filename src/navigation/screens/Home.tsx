import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { AnswerModal } from "../../components/AnswerModal";
import { ChecklistDetailsModal } from "../../components/ChecklistDetailsModal";
import { VehicleDetailsModal } from "../../components/VehicleDetailsModal";
import { VehicleList } from "../../components/VehicleList";
import {
  fetchChecklists,
  fetchVehicles,
  submitAnswer,
} from "../../services/api";
import { Checklist, Question, Vehicle } from "../../types/types";
import { getUserDataFromToken } from "../../utils/tokenUtils";

export const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const vehiclesData = await fetchVehicles();
        const checklistsData = await fetchChecklists();
        setVehicles(vehiclesData);
        setChecklists(checklistsData);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível carregar os dados.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmitAnswer = async (answer: string, observation: string) => {
    if (!selectedQuestion || !selectedVehicle || !selectedChecklist) return;

    try {
      const driverId = await getUserDataFromToken().then(
        (token) => token?.driver_id
      );

      if (!driverId) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Motorista não encontrado.",
        });
        return;
      }

      await submitAnswer({
        question: selectedQuestion.question,
        answer,
        asset_id: selectedVehicle.asset_id,
        driver_id: driverId,
        right_answer: selectedQuestion.right_answer,
        answered_at: new Date().toISOString(),
        observation,
        checklist_config_id: selectedChecklist.checklist_config.id,
      });
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Resposta enviada com sucesso!",
      });
      setSelectedQuestion(null);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível enviar a resposta.",
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#084b6f" style={{ flex: 1 }} />
    );
  }

  return (
    <View style={styles.container}>
      <VehicleList
        vehicles={vehicles}
        checkLists={checklists}
        onPress={(vehicle: Vehicle) => setSelectedVehicle(vehicle)}
      />

      <VehicleDetailsModal
        visible={!!selectedVehicle}
        vehicle={selectedVehicle}
        checklists={checklists}
        onClose={() => setSelectedVehicle(null)}
        onChecklistPress={(checklist: Checklist) => setSelectedChecklist(checklist)}
      />

      <ChecklistDetailsModal
        visible={!!selectedChecklist}
        checklist={selectedChecklist}
        onClose={() => setSelectedChecklist(null)}
        onQuestionPress={(question: Question) => setSelectedQuestion(question)}
      />

      <AnswerModal
        visible={!!selectedQuestion}
        question={selectedQuestion?.question || ""}
        hasObservation={selectedQuestion?.has_observation || false}
        onClose={() => setSelectedQuestion(null)}
        onSubmit={handleSubmitAnswer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});
