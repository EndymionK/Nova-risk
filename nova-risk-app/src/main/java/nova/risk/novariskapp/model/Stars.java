package nova.risk.novariskapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Stars {
    @Id
    private String id;
    private String nombre;
    private boolean completado;
}
