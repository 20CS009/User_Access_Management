const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

class User {
  static get [Symbol.for('typeorm:entity')]() {
    return {
      name: 'User',
      columns: {
        id: { primary: true, type: 'int', generated: 'increment' },
        username: { type: 'varchar', unique: true },
        password: { type: 'varchar' },
        role: { type: 'varchar' }, // 'Employee', 'Manager', 'Admin'
      },
    };
  }
}

module.exports = { User };