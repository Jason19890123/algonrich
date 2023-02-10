import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLayerGroup, faCaretDown, faCaretRight, faArrowDown, faCog } from "@fortawesome/free-solid-svg-icons";
import { COINSFROM, COINSFTO } from "const/Consts";
import { shortenIfAddress } from "utils/address";
import { Trans } from 'react-i18next';
import "./Swap.scss";
import { toastInfo } from "helpers/toast.helper";
import useConnect from "hooks/useConnect";
import { useBalances, useSwap, useTrade } from "hooks/useContract";
import { SwapType } from "types";
import erc20abi from 'erc-20-abi';

export default function Swap() {
  const [openSelectFrom, setOpenSelectFrom] = useState(false);
  const [openSelectTo, setOpenSelectTo] = useState(false);
  const [coinFrom, setCoinFrom] = useState('BNB');
  const [tokenAmountFrom, setTokenAmountFrom] = useState(0);
  const [coinTo, setCoinTo] = useState("ALGO");
  const [tokenAmountTo, setTokenAmountTo] = useState(0);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [maxBnbAmount, setMaxBnbAmount] = useState(0);
  const { bnb, updateBnb, getBnb, tokenBalance, updateTokenBalance, getTokenBalance } = useBalances(56);
  const { swapTokens, loading, disabled, error } = useSwap(56);
  const BNB_CONTRACT = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const ALGO_CONTRACT = "0x2dA63e26978B27CA854bdFe33F9866AA7c99813D";

  const { connect, isUnsupportedChainIdError, chainId, account, active, switchToBSC } = useConnect();
  const { getTradeAmount, bnbalgoRate, update: updateRate, tradeAmount } = useTrade(56);

  const handleSwapToken = async () => {
    if (!validateInput()) {
      toastInfo("Input Invalid");
      return;
    }
    swapTokens(tokenAmountFrom, coinFrom, coinTo).then((res) => {
      if (res) {
        updateBnb();
        updateTokenBalance();
      }
    });
  }
  const validateInput = () => {
    if (
      (tokenAmountFrom == null) ||
      (tokenAmountFrom <= 0) ||
      (tokenAmountFrom > maxBnbAmount)
    ) {
      return false;
    }
    return true;
  }
  useEffect(() => {
    let _temp_max = 0;
    if (coinFrom === 'BNB') {
      setCoinTo('ALGO');
      _temp_max = (bnb > 0.001) ? bnb - 0.001 : 0;
      setMaxBnbAmount(_temp_max);
      getTradeAmount(tokenAmountFrom, BNB_CONTRACT, ALGO_CONTRACT)
    } else {
      setCoinTo("BNB")
      _temp_max = (tokenBalance > 0.1) ? tokenBalance - 0.1 : 0;
      setMaxBnbAmount(_temp_max);
      getTradeAmount(tokenAmountFrom, ALGO_CONTRACT, BNB_CONTRACT)
    }

  }, [coinFrom, coinTo, bnb, tokenBalance])
  useEffect(() => {
    if (tokenAmountFrom == 0) {
      setTokenAmountTo(0)
      return;
    }
    setTokenAmountTo(parseFloat((tradeAmount).toFixed(8)))
  }, [tokenAmountFrom, tradeAmount])
  return (
    <div className="swap_form mt-[150px]">
      <div className="swap_form_content w-[90%] md:w-[600px]">
        <div className="swap_form_content_top">
          <div className="swap_control_left">
            {/* <span>Swap</span> */}
            {
              account && (<span>{shortenIfAddress(account)}</span>)
            }
          </div>
          <div className="swap_contol_right">
            <div className="icon" onClick={() => { setOpenSettingModal(!openSettingModal) }}>
              <FontAwesomeIcon icon={faLayerGroup} color="white" size="xl" />
            </div>
            <div className="icon">
              <FontAwesomeIcon icon={faClock} color="white" size="xl" />
            </div>
          </div>
        </div>
        <div className="swap_form_content_ratebar">
          <span className="text-[20px]">{bnbalgoRate.toFixed(10)} </span>
          <span className="text-[12px]">BNB/ALGO</span>
        </div>
        <div className="swap_form_content_inner_form">
          <div className='form'>
            <label htmlFor="">From ({"Max :" + maxBnbAmount.toFixed(5) + " " + coinFrom})</label>
            <div className='form_content'>
              <input type="number" className='form_content_input' placeholder='0' min={0}
                value={tokenAmountFrom} onInput={(e: any) => {
                  setTokenAmountFrom(e.target.value);
                  let amount = 0;
                  if (e.target.value) {
                    amount = parseFloat(e.target.value);
                  }
                  if (coinFrom === 'BNB') {
                    getTradeAmount(amount, BNB_CONTRACT, ALGO_CONTRACT)
                  } else {
                    getTradeAmount(amount, ALGO_CONTRACT, BNB_CONTRACT)
                  }
                }}
                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
              />
              <div className="form_content_select">
                <div className="select_header" onClick={() => setOpenSelectFrom(!openSelectFrom)}>
                  <span>{coinFrom}</span>
                  <FontAwesomeIcon icon={openSelectFrom === true ? faCaretDown : faCaretRight} color="white" size="sm" className="icon" />
                </div>
                <div className="select_content" style={{ display: openSelectFrom ? "" : "none" }}>
                  <ul>
                    {COINSFROM.map((coin, ind) => {
                      return (
                        <li key={ind} onClick={() => { setCoinFrom(coin); setOpenSelectFrom(false) }}>{coin}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swap_form_content_middle_bar">
          <a href="#">
            <FontAwesomeIcon icon={faArrowDown} color="white" size="lg" />
          </a>
        </div>
        <div className="swap_form_content_inner_form">
          <div className='form'>
            <label htmlFor="">To</label>
            <div className='form_content'>
              <input type="number" className='form_content_input' placeholder='0' min={0} value={tokenAmountTo} onInput={(e: any) => {
                // setTokenAmountTo(e.target.value);
                // let amount = 0;
                //   if (e.target.value) {
                //     amount = e.target.value;
                //   }
                //   getTradeRate(amount)
                //   setTokenAmountFrom(parseFloat((amount / bnbalgoRate).toFixed(8)))
              }}
                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
              />
              <div className="form_content_select">
                <div className="select_header" onClick={() => setOpenSelectTo(!openSelectTo)}>
                  <span>{coinTo}</span>
                  <FontAwesomeIcon icon={openSelectTo === true ? faCaretDown : faCaretRight} color="white" size="sm" className="icon" />
                </div>
                <div className="select_content" style={{ display: openSelectTo ? "" : "none" }}>
                  <ul>
                    {COINSFTO.map((coin, ind) => {
                      return (
                        <li key={ind} onClick={() => { setCoinTo(coin); setOpenSelectTo(false) }}>{coin}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swap_form_content_btn">
          {(account && active && !isUnsupportedChainIdError && chainId === 56) ? (
            <button
              onClick={() => handleSwapToken()}
            >
              <Trans i18nKey="text_swap">Swap</Trans>
            </button>
          ) : (
            <button
              onClick={() => {
                connect();
                switchToBSC();
              }}
            >
              <Trans i18nKey="text_connectwallet">Connect Wallet</Trans>
            </button>
          )}
        </div>
        <div className="modal">
          <div className={openSettingModal ? "modal_setting" : "modal_setting dis-none"}>
            <div className="modal_header">
              <FontAwesomeIcon icon={faCog} color="white" size="xl" className="icon" />
              <h3>Setting</h3>
            </div>
            <div className="modal_content">
              <div className="swap_set">
                <span>Default Transaction Speed</span>
                <ul>
                  <li>standard (6)</li>
                  <li>fast (7)</li>
                  <li>instant (8)</li>
                </ul>
              </div>
              <div className="swap_set">
                <span>Slippage Tolerance</span>
                <ul>
                  <li>0.1%</li>
                  <li>0.5%</li>
                  <li>1%</li>
                  <li>10%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}