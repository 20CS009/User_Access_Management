const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

class Software {
  static get [Symbol.for('typeorm:entity')]() {
    return {
      name: 'Software',
      columns: {
        id: { primary: true, type: 'int', generated: 'increment' },
        name: { type: 'varchar' },
        description: { type: 'text' },
        accessLevels: { type: 'simple-array' }, // e.g., ['Read', 'Write', 'Admin']
      },
    };
  }
}

module.exports = { Software };