export interface VehicleItem {
  id?: string;
  insuranceVehicle?: string;
  technicalVisitVehicle?: string;
  vehicleType?: string;
  safetyBeltVehicle?: boolean;
  missionId?: string;
}

export interface VehicleInitialState {
  vehicleList: VehicleItem[];
  vehicle: VehicleItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
