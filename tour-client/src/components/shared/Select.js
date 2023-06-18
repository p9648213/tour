"use client";

import { useState, useEffect, useRef } from "react";

export default function Select({
  multiple,
  value,
  onChange,
  options,
  clearable,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  }

  function isOptionSelected(option) {
    return multiple
      ? JSON.stringify(value).includes(JSON.stringify(option))
      : JSON.stringify(option) === JSON.stringify(value);
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.target != containerRef.current) {
        return;
      }

      e.preventDefault();

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);

          if (isOpen) {
            if (highlightedIndex !== -1) {
              selectOption(options[highlightedIndex]);
            }
          }
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    let refElement = containerRef.current;

    refElement.addEventListener("keydown", handler);

    return () => {
      refElement.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }}
      onClick={() => {
        setIsOpen((prev) => !prev);
        setHighlightedIndex(-1);
      }}
      tabIndex={0}
      className="select-container"
    >
      <span className="value">
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className="option-badge"
              >
                {v.label}
                <span className="remove-btn">&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      {clearable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className="clear-btn"
        >
          &times;
        </button>
      )}
      <div className="divider"></div>
      <div className="caret"></div>
      <ul className={`options ${isOpen ? "show" : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`option ${isOptionSelected(option) ? "selected" : ""} ${
              index === highlightedIndex ? "highlighted" : ""
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
