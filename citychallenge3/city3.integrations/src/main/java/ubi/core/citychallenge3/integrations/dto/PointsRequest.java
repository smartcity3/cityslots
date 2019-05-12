package ubi.core.citychallenge3.integrations.dto;

import java.io.Serializable;

public class PointsRequest implements Serializable {
    String playerId;
    String currency;
    Double amount;

    public PointsRequest() {

    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
