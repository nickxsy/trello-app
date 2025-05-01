export type BoardPartial = {
  id: string;
  title: string;
  ownerId: string;
  editorsIds: string[];
};

export type CreateBoardFormData = {
  title: string;
  editorsIds: string[];
};

export type UpdateBoardFormData = {
  title?: string;
  editorsIds?: string[];
  ownerId?: string;
};
