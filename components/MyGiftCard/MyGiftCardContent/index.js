import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerCardList } from '../../../modules/mygiftcard/mygiftcardslice'
import { isLoginToken } from '../../../utilities/authUtils'

const CommonWrapper = styled.div`
  margin: 0;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const GiftContentwrapper = styled.div`
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
`
const GiftContent = styled.div``

const MyGiftCardTitle = styled.h2`
  font-size: 26px;
  font-weight: normal;
  color: #222;
  @media (max-width: 467px) {
    font-size: 30px;
  }
`
const Borderbottom = styled.div`
  border-bottom: 1px solid #cccccc;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  @media (max-width: 467px) {
    flex-direction: column;
    align-items: flex-start;
  }
  &::last-child {
    border-bottom: 0;
  }
`
const Cardspay = styled.div`
  margin-right: 2rem;
`
const Cardactions = styled.div`
  position: relative;
  min-width: 200px;
  min-height: 120px;
  background: #000;
  margin: 0 auto;
`

const Cardamt = styled.div`
  position: absolute;
  display: block;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Titlecard = styled.h2`
  font-size: 36px;
  font-weight: normal;
  color: #222;

  @media (max-width: 991px) {
    font-size: 26px;
  }
`

const Description = styled.div`
  margin-right: 2rem;
`
const Status = styled.div`
  margin-left: auto;
  @media (max-width: 467px) {
    margin-left: 0;
  }
`

const Center = styled.div`
  text-align: center;
`

const PurchasedButton = styled.button`
  font-weight: 600;
  font-size: 16px;
  background-color: #222222;
  color: #fff;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  border-radius: 0;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  border-radius: 0px !important;
`
const CardLogo = styled.img`
  width: 55px;
  position: absolute;
  bottom: 10px;
  left: 10px;
`

const MyGiftCardContent = () => {
  const { t } = useTranslation('giftcard')

  const dispatch = useDispatch()

  const email = useSelector(
    (state) => state.root?.myProfile?.userData?.email?.value
  )

  const customerUsedGiftCard = useSelector(
    (state) => state.root?.mygiftcard?.customerUSedGiftcards
  )
  // const data = [
  //   {
  //     _id: 1,
  //     type: "Used",
  //     name: "BJorn anderson",
  //     price: "100",
  //     validDate: "28 / 10 / 2021",
  //     purchasedOn: "24 / 10 / 21",
  //   },
  //   {
  //     _id: 2,
  //     type: "valid",
  //     name: "BJorn anderson",
  //     price: "100",
  //     validDate: "28 / 10 / 2021",
  //     purchasedOn: "24 / 10 / 21",
  //   },
  //   {
  //     _id: 3,
  //     type: "expired",
  //     name: "BJorn anderson",
  //     price: "100",
  //     validDate: "28 / 10 / 2021",
  //     purchasedOn: "24 / 10 / 21",
  //   },
  // ];

  // return of {type,name,price,valid,purchasedDate,_id}

  useEffect(() => {
    if (isLoginToken() && email) {
      dispatch(getCustomerCardList(email, t))
    }
  }, [dispatch, email])

  return (
    <div>
      <CommonWrapper>
        <GiftContentwrapper>
          <GiftContent>
            <MyGiftCardTitle>{t(`myGiftCardContent.title`)}</MyGiftCardTitle>
            {customerUsedGiftCard && customerUsedGiftCard.length > 0 ? (
              customerUsedGiftCard.map((d) => (
                <div className="list-card" key={d._id}>
                  <Borderbottom className="d-flex">
                    <Cardspay className="cards-pay">
                      <Cardactions className="card-actions">
                        <CardLogo
                          src="assets/logo.png"
                          alt="Logo"
                        />
                        <Cardamt className="card-amt">{d.gift_card_amount}</Cardamt>
                      </Cardactions>
                    </Cardspay>
                    <Description>
                      <p> To: {d.to}</p>
                      <p> EUR {d.gift_card_amount}</p>
                      <p> Valid until: {d.valid_till} </p>
                      <p> Purchased On: {d.purchased_on}</p>
                    </Description>
                    <Status>
                      <p>{d.giftcard_status}</p>
                    </Status>
                  </Borderbottom>
                </div>
              ))
            ) : (
              <Center>
                <div> {t(`myGiftCardContent.noGiftCard`)}</div>
              </Center>
            )}
            <Center>
              <Titlecard className="text-center title-card">
                {t(`myGiftCardContent.makeCard`)}
              </Titlecard>
              <Link href="/giftcard">
                <PurchasedButton type="submit">
                  {t(`myGiftCardContent.buttonText`)}
                </PurchasedButton>
              </Link>
            </Center>
          </GiftContent>
        </GiftContentwrapper>
      </CommonWrapper>
    </div>
  )
}

// TeamSection.propTypes = {
//   tabContent: PropTypes.object,
// }

export default MyGiftCardContent
