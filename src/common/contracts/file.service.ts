import { IFile } from '@nestjs/common/pipes/file/interfaces';

export interface IFileService {
  upload(file: IFile): Promise<any>;

  delete(file: IFile): Promise<any>;
}
