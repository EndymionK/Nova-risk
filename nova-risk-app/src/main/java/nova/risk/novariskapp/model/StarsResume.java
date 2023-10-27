package nova.risk.novariskapp.model;

import lombok.Getter;

@Getter
public class StarsResume {
    private int quantityStars;
    private double averagepSupernova;
    private double averageDistance;
    private double averageLuminosity;
    private double averageRadialVelocity;
    private double averageMagnitude;

    public void setQuantityStars(int quantityStars) {
        this.quantityStars = quantityStars;
    }

    public void setAveragepSupernova(double averagepSupernova) {
        this.averagepSupernova = averagepSupernova;
    }

    public void setAverageDistance(double averageDistance) {
        this.averageDistance = averageDistance;
    }

    public void setAverageLuminosity(double averageLuminosity) {
        this.averageLuminosity = averageLuminosity;
    }

    public void setAverageRadialVelocity(double averageRadialVelocity) {
        this.averageRadialVelocity = averageRadialVelocity;
    }

    public void setAverageMagnitude(double averageMagnitude) {
        this.averageMagnitude = averageMagnitude;
    }

}
