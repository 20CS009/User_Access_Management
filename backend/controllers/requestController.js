const { AppDataSource } = require('../config/database');
const { Request } = require('../entities/Request');
const { User } = require('../entities/User');
const { Software } = require('../entities/Software');

const requestRepository = AppDataSource.getRepository(Request);
const userRepository = AppDataSource.getRepository(User);
const softwareRepository = AppDataSource.getRepository(Software);

const submitRequest = async (req, res) => {
  const { softwareId, accessType, reason } = req.body;
  try {
    const user = await userRepository.findOne({ where: { id: req.user.id } });
    const software = await softwareRepository.findOne({ where: { id: softwareId } });

    if (!user || !software) {
      return res.status(404).json({ message: 'User or software not found' });
    }

    const accessRequest = requestRepository.create({
      user,
      software,
      accessType,
      reason,
      status: 'Pending',
    });

    await requestRepository.save(accessRequest);
    res.status(201).json(accessRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting request' });
  }
};

const manageRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const accessRequest = await requestRepository.findOne({ where: { id: parseInt(id) } });
    if (!accessRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    accessRequest.status = status;
    await requestRepository.save(accessRequest);
    res.json(accessRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error updating request' });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await requestRepository.find({
      where: { status: 'Pending' },
      relations: ['user', 'software'],
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

module.exports = { submitRequest, manageRequest, getPendingRequests };