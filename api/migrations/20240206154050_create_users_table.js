/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigIncrements('id');
    table.string('nome');
    table.string('email');
    table.string('password');
    table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('users')
};
