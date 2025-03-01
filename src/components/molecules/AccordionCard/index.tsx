/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import CardAccordion from "./styles";

interface Props {
    title: string;
    active: boolean;
    content?: any;
    loading: boolean;
    onClick: ()=> void;
}

const AccordionCard = ({
    title,
    active,
    content,
    loading,
    onClick
}: Props) => {

    const RenderCardChildren = useMemo(() => {
        if(loading) {
            return (
                <>
                    {Array.from({ length: 7 }, (_, index) => (
                        <CardAccordion.LoadingCard key={index}/>
                    ))}
                </>
            )
        }
        if(!loading && content.length === 0) {
            return (
                <CardAccordion.CardContent>
                    <CardAccordion.ContainerDesc>
                        <CardAccordion.ContentTitle>{'Repo not found'}</CardAccordion.ContentTitle>
                    </CardAccordion.ContainerDesc>
                </CardAccordion.CardContent>
            )
        }
        return (
            <CardAccordion.ContainerList>
                {content?.map((repo: any, index: number) => (
                    <CardAccordion.CardContent key={index}>
                        <CardAccordion.ContainerDesc>
                            <CardAccordion.ContentTitle>{repo?.name || '-'}</CardAccordion.ContentTitle>
                            <CardAccordion.ContentDesc>{repo?.description || "No description available"}</CardAccordion.ContentDesc>
                        </CardAccordion.ContainerDesc>
                        <CardAccordion.ContentTitle>⭐ {repo.stargazers_count || 0}</CardAccordion.ContentTitle>
                    </CardAccordion.CardContent>
                ))}
            </CardAccordion.ContainerList>
        )
    },[content, loading]);
    
    const RenderMain = useMemo(() => {
        return (
            <CardAccordion.Container>
                <CardAccordion.Header active={active} onClick={onClick}>
                    <CardAccordion.TitleHeader>{title}</CardAccordion.TitleHeader>
                    <CardAccordion.Icon isOpen={active} />
                </CardAccordion.Header>
                {active ?  RenderCardChildren : null}
                {/* <CardAccordion.CardContent>
                    <CardAccordion.ContainerDesc>
                        <CardAccordion.ContentTitle>{'Test'}</CardAccordion.ContentTitle>
                        <CardAccordion.ContentDesc>{'Descsdsdsd'}</CardAccordion.ContentDesc>
                    </CardAccordion.ContainerDesc>
                    <CardAccordion.ContentTitle>⭐ {'1'}</CardAccordion.ContentTitle>
                </CardAccordion.CardContent>
                <CardAccordion.CardContent>
                    <CardAccordion.ContainerDesc>
                        <CardAccordion.ContentTitle>{'Test'}</CardAccordion.ContentTitle>
                        <CardAccordion.ContentDesc>{'Descsdsdsd'}</CardAccordion.ContentDesc>
                    </CardAccordion.ContainerDesc>
                    <CardAccordion.ContentTitle>⭐ {'1'}</CardAccordion.ContentTitle>
                </CardAccordion.CardContent> */}
            </CardAccordion.Container>
        )
    },[RenderCardChildren, active, onClick, title]);

    return RenderMain;
};

export default AccordionCard;