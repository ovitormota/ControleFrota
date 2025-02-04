import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Checklist, Vehicle } from "../types/types";
import { ChecklistList } from "./ChecklistList";

interface VehicleDetailsModalProps {
  visible: boolean;
  vehicle: Vehicle | null;
  checklists: Checklist[];
  onClose: () => void;
  onChecklistPress: (checklist: Checklist) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  visible,
  vehicle,
  checklists,
  onClose,
  onChecklistPress,
}) => {
  if (!vehicle) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContent}>
          <Text style={globalStyles.modalTitle}>Checklists do Veículo</Text>
          <ChecklistList
            checklists={checklists.filter((c) =>
              c.assets.includes(vehicle.asset_id)
            )}
            onPress={onChecklistPress}
          />
          <TouchableOpacity style={globalStyles.closeButton} onPress={onClose}>
            <Text style={globalStyles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
