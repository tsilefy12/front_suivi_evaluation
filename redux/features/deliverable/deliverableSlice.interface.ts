export interface DeliverableItem {
  id?: string;
  description?: string;
  missionId?: string;
}

export interface DeliverableInitialState {
  deliverableList: DeliverableItem[];
  deliverable: DeliverableItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
