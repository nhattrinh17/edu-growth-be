import { Op } from 'sequelize';

export * from './user.model';
export * from './subject.model';
export * from './eduLevel.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
