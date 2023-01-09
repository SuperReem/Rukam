import React from "react";
import "./MultiStepProgressBar.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = props => {
  var stepPercentage = 0;

  if (props.currentStep === "pending") {
    stepPercentage = 0;
  } else if (props.currentStep === "under_processing") {
    stepPercentage = 50;
  } else if (props.currentStep === "closed") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar className='progress' percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
          <div className="pt-2">
                &#10003;
                </div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <div className="pt-2">
                &#10003;
                </div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
              <div className="pt-2">
                &#10003;
                </div>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;

