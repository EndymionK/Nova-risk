package nova.risk.novariskapp.repo;

import nova.risk.novariskapp.model.Stars;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StarsRepository extends MongoRepository<Stars, String> {

}
