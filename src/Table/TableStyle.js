import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background: white;
      &hover {
        background-color: black;
      }

      :last-child {
        border-right: 0;
      }
    }
    .resizer {
      display: inline-block;
      background: blue;
      width: 10px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      /* transform: translateX(50%); */
      z-index: 1;
      ${"" /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: red;
      }
    }
  }
`;

const BlockStyles = styled.div`
  padding: 1rem;
  overflow:auto;
  border: 1px solid black;

  .table {
    display: inline-block;
    border-spacing: 0;

    .tr {
      :hover {
        background-color: #fff3e3;
      }
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th {
      margin: auto;
      padding-bottom:0.5rem;
      padding-top:0.5rem;
      :last-child {
        border-right: 0;
      }
    }
    .td {
      margin: auto;
      display:flex;
      justify-content:space-between;
      padding: 0.5rem;
      
      :last-child {
        border-right: 0;
      }
    }
    .resizer {
        display: inline-block;
        background: #dee2e6;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        /* transform: translateX(50%); */
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: #fff8ee;
        }
      }
  }
  }
`;

export { Styles, BlockStyles };
