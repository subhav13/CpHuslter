export const langs = ["java", "c_cpp", "javascript", "python", "ruby"];
export const themes = [
  "monokai",
  "github",
  "tomorrow_night",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];
export const languageCode = {
  java: 62,
  c_cpp: 54,
  python: 71,
  javascript: 63,
  ruby: 72,
};

export const languages = {
  "java-2": {
    startupcode: `import java.io.*;
    import java.util.*;
  
    public class Main{
  
        public static void main(String[] args) throws Exception {
            // write your code here
        }
  
    }`,
    language: "java",
    versionIndex: "2",
  },
  "c-3": {
    startupcode: `#include <stdio.h>
    #include <string.h>
    #include <math.h>
    #include <stdlib.h>
    
    
    
    int main() 
    {
        int a, b;
        scanf("%d\n%d", &a, &b);
        // Complete the code.
    
        return 0;
    }
    
    `,
    language: "c",
    versionIndex: "3",
  },
  "cpp-3": {
    startupcode: `#include <iostream>
    #include <cstdio>
    using namespace std;
    
    int main() {
        printf("Hello, World!");
        return 0;
    }`,
    language: "cpp",
    versionIndex: "3",
  },
  "python3-3": {
    startupcode: `print("")`,
    language: "python3",
    versionIndex: "3",
  },
};
export const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28];

export const langChangeCause = Object.freeze({
  submission:   Symbol("submission"),
  dropdown:  Symbol("blue"),
});