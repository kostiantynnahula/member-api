export interface Folder {
  _id: string;
  name: string;
}

export interface File {
  _id: string;
  name: string;
  folder_id: Folder;
}
