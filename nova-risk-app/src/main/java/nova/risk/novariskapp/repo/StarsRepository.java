package nova.risk.novariskapp.repo;

import nova.risk.novariskapp.model.Stars;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StarsRepository extends MongoRepository<Stars, String> {
    List<Stars> findBypSupernovaGreaterThanAndDistNotNullOrderByDistAsc(Double minpSupernova); // Agregar método findByPSupernovaGreaterThanAndDistNotNullOrderByDistAsc


}


