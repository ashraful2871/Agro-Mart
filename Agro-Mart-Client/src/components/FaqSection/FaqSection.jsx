import { useContext, useState } from "react";
import FaqSectionsImageOne from "../../assets/senior-hardworking-farmer-agronomist-soybean-field-checking-crops-before-harvest.jpg";
import FaqSectionsImageTwo from "../../assets/positive-mature-man-carrying-basket-with-fresh-strawberries.jpg";
import { ThemeContext } from "../../provider/ThemeProvider";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

// MUI styled components
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    color: "#ffffff",
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
      color: "#ffffff",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// Main Component
const FaqSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useContext(ThemeContext);
  const {t} = useTranslation();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const faqs = [
    {
      question: t('faq.faqs.0.question'),
      answer: t('faq.faqs.0.answer'),
    },
    {
      question: t('faq.faqs.1.question'),
      answer: t('faq.faqs.1.answer'),
    },
    {
      question: t('faq.faqs.2.question'),
      answer: t('faq.faqs.2.answer'),
    },
  ];

  return (
    <>
      {/* Large devices */}
      <div className="hidden lg:block">
        <div className="flex flex-col md:flex-row justify-between pt-20 pb-44 relative">
          <div>
            <img
              src={FaqSectionsImageOne}
              alt="faq-img-1"
              className="h-96 w-[450px] rounded-xl"
            />
          </div>
          <div className="max-w-lg lg:max-w-xl">
            <h3
              className={`${
                theme === "dark" ? "text-green-600" : "text-green-700"
              } text-xl`}
            >
              {t('faq.title')}
            </h3>
            <h3
              className={`${
                theme === "dark" ? "text-green-600" : "text-green-700"
              } text-xl md:text-5xl font-bold my-2 font-syne`}
            >
              {t('faq.subTitle')}
            </h3>
            <p>
              {t('faq.description')}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="ml-auto absolute -top-[350px] right-0 flex">
            <div className="mr-24">
              <img
                src={FaqSectionsImageTwo}
                alt="faq-img-2"
                className="h-60 w-60 rounded-xl"
              />
            </div>
            <div className="max-w-xl">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  className=" mb-3"
                >
                  <AccordionSummary
                    aria-controls={`panel${index}d-content`}
                    id={`panel${index}d-header`}
                    className="bg-green-700 text-white rounded-md border-2 border-red-500"
                  >
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="bg-green-700 text-white rounded-md ">
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Small and medium devices */}
      <div className="block lg:hidden">
        <div className="py-20">
          <div className="text-center">
            <h3 className="text-xl text-green-700">
              Frequently Asked Questions
            </h3>
            <h3 className="text-5xl font-bold my-2 font-syne">
              Do You Have Any Questions ?
            </h3>
            <p>
              Explore the frequently asked questions below for quick solutions
              to common inquiries. We’ve got you covered with helpful insights
              and support.
            </p>
          </div>
          <div className="max-w-xl mx-auto mt-4">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  className="bg-green-500 text-white "
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqSection;
