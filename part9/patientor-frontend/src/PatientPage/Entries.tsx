import React from "react";
import { Entry } from "../types";
import { Container, Icon, Card, Button } from "semantic-ui-react";
import HealthRatingBar from '../components/HealthRatingBar'


const Entries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
    if(!entries){
        return(<div></div>)
    }
    return (<div>
        {
            entries.map(entry => {
                switch (entry.type) {
                    case "HealthCheck":
                        return (
                            <div key={entry.id}>
                                {/* <h4>  {entry.date}{" "}{entry.description}</h4>
                                    <ul> {entry.diagnosisCodes?.map(code => <li key={code}>{code}{" "}{diagnosis.map(x => x.code === code ? x.name : '')}</li>)}</ul> */}

                                <Card fluid >
                                    <Card.Content>
                                        <Card.Header>
                                            {entry.date}
                                            <Icon color={"blue"} name={"doctor"} />
                                        </Card.Header>
                                        <Card.Meta>
                                            {entry.specialist}
                                        </Card.Meta>
                                        <Card.Description>
                                            {entry.description}
                                        </Card.Description>
                                        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />

                                    </Card.Content>
                                </Card>
                            </div>
                        )
                    case "Hospital":
                        return (
                            <div key={entry.id}>
                                {/* <h4>  {entry.date}{" "}{entry.description}</h4>
                                    <ul> {entry.diagnosisCodes?.map(code => <li key={code}>{code}{" "}{diagnosis.map(x => x.code === code ? x.name : '')}</li>)}</ul> */}

                                <Card fluid >
                                    <Card.Content>
                                        <Card.Header>
                                            {entry.date}
                                            <Icon color={"blue"} name={"hospital"} />
                                        </Card.Header>
                                        <Card.Meta>
                                            {entry.specialist}
                                        </Card.Meta>
                                        <Card.Description>
                                            {entry.description}
                                        </Card.Description>

                                    </Card.Content>
                                </Card>
                            </div>
                        )

                    case "OccupationalHealthcare":
                        return (
                            <div key={entry.id}>
                                {/* <h4>  {entry.date}{" "}{entry.description}</h4>
                                    <ul> {entry.diagnosisCodes?.map(code => <li key={code}>{code}{" "}{diagnosis.map(x => x.code === code ? x.name : '')}</li>)}</ul> */}

                                <Card fluid >
                                    <Card.Content>
                                        <Card.Header>
                                            {entry.date}
                                            <Icon color={"blue"} name={"stethoscope"} />
                                            {entry.employerName}
                                        </Card.Header>
                                        <Card.Meta>
                                            {entry.specialist}
                                        </Card.Meta>
                                        <Card.Description>
                                            {entry.description}
                                        </Card.Description>

                                    </Card.Content>
                                </Card>
                            </div>
                        )

                }

            })
        }

    </div>)
}



export default Entries