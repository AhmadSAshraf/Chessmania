import React, { useEffect, useRef, useState } from 'react'
import BasePage from "./BasePage";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';
import MatchPlayerCard from '../components/MatchPlayerCard';
import NotFound from '../components/NotFound';

/**
 * Match page containing information regarding a specific match and allowing the user to enter a match outcome.
 * A match outcome can be modified as long as it is not yet validated.
 * Match player cards are changing css classes depending of the outcome.
 */

const MatchDetail = () => {

}