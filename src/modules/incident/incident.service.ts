import { DataSource } from 'typeorm';
import { Incident } from './Incident.entity';

export { buildIncidentService };

function buildIncidentService(dataSource: DataSource) {
    const repository = dataSource.getRepository(Incident);

    return { insertOne, hasBeenRegistered };

    async function insertOne(gitGuardianId: number): Promise<boolean> {
        const result = await repository.insert({ gitGuardianId });
        return result.identifiers.length == 1;
    }

    async function hasBeenRegistered(gitGuardianId: number): Promise<boolean> {
        return repository.exist({ where: { gitGuardianId } });
    }
}
