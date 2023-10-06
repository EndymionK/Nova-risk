package nova.risk.novariskapp.repo;

import nova.risk.novariskapp.model.Stars;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StarsRepository extends MongoRepository<Stars, String> {
    // Otras consultas personalizadas si es necesario
}
