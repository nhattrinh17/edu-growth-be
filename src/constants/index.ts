export const Status = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
};

export enum Gender {
  MALE = 'MALE',
  GIRL = 'FEMALE',
  OTHER = 'OTHER',
}

export const Environment = {
  Development: 'development',
  Production: 'production',
};

export const TypeUser = {
  Tutor: 'Tutor',
  Admin: 'Admin-CMS',
};

export const StatusClass = {
  stillEmpty: 0, // Trống,
  received: 1, // Đã có người nhận,
  assignedClass: 2, // Đã giao lớp
  cancelClass: 3, // Hủy lớp
};

export const TypeRequireClass = {
  student: 0,
  maleStudent: 1,
  femaleStudent: 2,
  lecturers: 3,
};

export const GenderStudent = {
  Male: 0,
  Female: 1,
};

export * from './message';
