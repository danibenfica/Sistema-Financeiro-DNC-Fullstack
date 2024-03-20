/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('transacoes', (table) => {
      table.bigIncrements('id');
      table.string('descricao');
      table.string('tipo');
      table.integer('valor');
      table.date('data');
      table.bigint('user_id').unsigned().references('id').inTable('users');
      table.bigint('category').unsigned().references('id').inTable('categories');
      table.timestamps(true,true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function(knex) {
    return knex.schema.dropTable('transacoes')
  };
  