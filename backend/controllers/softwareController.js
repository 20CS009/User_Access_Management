const { AppDataSource } = require('../config/database');
const { Software } = require('../entities/Software');

const softwareRepository = AppDataSource.getRepository(Software);

const createSoftware = async (req, res) => {
  const { name, description, accessLevels } = req.body;
  try {
    const software = softwareRepository.create({
      name,
      description,
      accessLevels,
    });
    await softwareRepository.save(software);
    res.status(201).json(software);
  } catch (error) {
    res.status(400).json({ message: 'Error creating software' });
  }
};

const getSoftwareList = async (req, res) => {
  try {
    const software = await softwareRepository.find();
    res.json(software);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching software list' });
  }
};

module.exports = { createSoftware, getSoftwareList };