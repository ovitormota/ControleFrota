import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Checklist, Vehicle } from "../types/types";

interface VehicleListProps {
  vehicles: Vehicle[];
  checkLists: Checklist[];
  onPress: (vehicle: Vehicle) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  checkLists,
  onPress,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleClearSearch = (): void => {
    setSearchText("");
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = searchText.toLowerCase();
    return vehicle.plate.toLowerCase().includes(searchLower);
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar veículo por placa"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color="#084b6f"
            />
          </TouchableOpacity>
        )}
      </View>

      {filteredVehicles.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <MaterialCommunityIcons
            name="emoticon-sad"
            size={50}
            color="#bbb"
          />
          <Text style={styles.noResultsText}>Nenhum veículo encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVehicles}
          keyExtractor={(item) => item.asset_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <View style={styles.vehicleItem}>
                <View>
                  <Text>
                    <Text style={globalStyles.boldText}>Placa:</Text> {item.plate}
                  </Text>
                  <Text>
                    <Text style={globalStyles.boldText}>Modelo:</Text>{" "}
                    {item.car_model}
                  </Text>
                  <Text>
                    <Text style={globalStyles.boldText}>Motorista:</Text>{" "}
                    {item.driver_name}
                  </Text>
                  <Text>
                    <Text style={globalStyles.boldText}>
                      Checklists associados:
                    </Text>{" "}
                    {
                      checkLists.filter((checklist) =>
                        checklist.assets.includes(item.asset_id)
                      ).length
                    }
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="eye-arrow-right"
                  size={26}
                  color="#084b6f"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  vehicleItem: {
    backgroundColor: "#fff",
    padding: 16,
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
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: "#aaa",
    marginTop: 10,
  },
});
