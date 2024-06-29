import { Op } from 'sequelize';

export * from './user.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
