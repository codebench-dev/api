import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class JobStatusDTO {
  @jsonMember
  id: string;

  @jsonMember
  status: string;

  @jsonMember
  message: string;

  @jsonMember
  error: string;

  @jsonMember
  stdout: string;

  @jsonMember
  stderr: string;

  @jsonMember
  exec_duration: number;
}
