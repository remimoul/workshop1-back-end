export interface Image {
  frontViewUrl?: string;
  backViewUrl?: string;
  sideViewUrl?: string;
  description?: string;
  isBase?: boolean;
  name?: string;
  alt?: string;
  src: string;
  date_created?: Date;
  date_created_gmt?: Date;
  date_modified?: Date;
  date_modified_gmt?: Date;
}
