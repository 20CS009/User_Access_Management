const { Entity, PrimaryGeneratedColumn, Column, ManyToOne } = require('typeorm');
const { User } = require('./User');
const { Software } = require('./Software');

class Request {
  static get [Symbol.for('typeorm:entity')]() {
    return {
      name: 'Request',
      columns: {
        id: { primary: true, type: 'int', generated: 'increment' },
        accessType: { type: 'varchar' }, // 'Read', 'Write', 'Admin'
        reason: { type: 'text' },
        status: { type: 'varchar' }, // 'Pending', 'Approved', 'Rejected'
      },
      relations: {
        user: { type: 'many-to-one', target: User, joinColumn: true },
        software: { type: 'many-to-one', target: Software, joinColumn: true },
      },
    };
  }
}

module.exports = { Request };