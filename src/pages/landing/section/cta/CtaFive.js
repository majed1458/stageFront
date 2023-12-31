import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from '../../components/button/Button'
import { TextBlock, TitleH2 } from '../../components/textBlock/TextBlock'
import { BgImage } from '../../../layout/ovm/Ovm'
import { Section } from '../../../layout/section/Section'

const CtaFive = (props) => {
  return (
    <Section className={props.className && props.className} id={props.id && props.id}>
        <Container>
            <Row className="justify-content-center text-center">
                <Col lg="9" md="10">
                    <TextBlock className="is-compact py-3">
                        <TitleH2 color="white">Powerful Ai Tool For Detecting Car Damages</TitleH2>
                        <p>Join 2,800 happy customers &amp; start using our service</p>
                        <ul className="btns-inline justify-center pt-2">
                            <li>
                                <Link to="/" target="_blank" rel="noreferrer" className="btn-xl btn-primary btn-round">Get Free Trial</Link>
                            </li>
                        </ul>
                    </TextBlock>
                </Col>
            </Row>
        </Container>
        <BgImage className="bg-image bg-overlay after-bg-dark after-opacity-90 overlay-fall bg-image-loaded bg-image-cta-a" />
    </Section>
  )
}

export default CtaFive
