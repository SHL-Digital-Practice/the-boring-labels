############ 1. IMPORTING LIBRARIES ############

# Import streamlit, requests for API calls, and pandas and numpy for data manipulation

import streamlit as st
import requests
import pandas as pd
import numpy as np
import torch
from streamlit_tags import st_tags  # to add labels on the fly!
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


############ 2. SETTING UP THE PAGE LAYOUT AND TITLE ############

# `st.set_page_config` is used to display the default layout width, the title of the app, and the emoticon in the browser tab.

st.set_page_config(
    layout="centered", page_title="The Boring CSV Machine", page_icon="❄️"
)

############ CREATE THE LOGO AND HEADING ############

# We create a set of columns to display the logo and the heading next to each other.


c1, c2 = st.columns([0.32, 2])

# The snowflake logo will be displayed in the first column, on the left.

with c1:

    st.image(
        "images/boring logo.svg",
        width=85,
    )


# The heading will be on the right.

with c2:

    st.caption("")
    st.title("The Boring CSV Machine")


# We need to set up session state via st.session_state so that app interactions don't reset the app.

if not "valid_inputs_received" in st.session_state:
    st.session_state["valid_inputs_received"] = False


############ SIDEBAR CONTENT ############

st.sidebar.write("")

# For elements to be displayed in the sidebar, we need to add the sidebar element in the widget.

# We create a text input field for users to enter their API key.

API_KEY = st.sidebar.text_input(
    "Enter your HuggingFace API key",
    help="Once you created you HuggingFace account, you can get your free API token in your settings page: https://huggingface.co/settings/tokens",
    type="password",
)

# Adding the HuggingFace API inference URL.
API_URL = "https://api-inference.huggingface.co/models/valhalla/distilbart-mnli-12-3"

# Now, let's create a Python dictionary to store the API headers.
headers = {"Authorization": f"Bearer {API_KEY}"}


st.sidebar.markdown("---")


# Let's add some info about the app to the sidebar.

st.sidebar.write(
    """

App created by [Charly Wargnier](https://twitter.com/DataChaz) using [Streamlit](https://streamlit.io/)🎈 and [HuggingFace](https://huggingface.co/inference-api)'s [Distilbart-mnli-12-3](https://huggingface.co/valhalla/distilbart-mnli-12-3) model.

"""
)


############ TABBED NAVIGATION ############

# First, we're going to create a tabbed navigation for the app via st.tabs()
# tabInfo displays info about the app.
# tabMain displays the main app.

MainTab, InfoTab = st.tabs(["Main", "Info"])

with InfoTab:

    st.subheader("What is Streamlit?")
    st.markdown(
        "[Streamlit](https://streamlit.io) is a Python library that allows the creation of interactive, data-driven web applications in Python."
    )

    st.subheader("Resources")
    st.markdown(
        """
    - [Streamlit Documentation](https://docs.streamlit.io/)
    - [Cheat sheet](https://docs.streamlit.io/library/cheatsheet)
    - [Book](https://www.amazon.com/dp/180056550X) (Getting Started with Streamlit for Data Science)
    """
    )

    st.subheader("Deploy")
    st.markdown(
        "You can quickly deploy Streamlit apps using [Streamlit Community Cloud](https://streamlit.io/cloud) in just a few clicks."
    )


with MainTab:

    # Then, we create a intro text for the app, which we wrap in a st.markdown() widget.

    st.write("")
    st.markdown(
        """

    Matching Space Type Names is BORING, now do it on the fly with this app, No training needed!

    """
    )

    st.write("")

    ########################################Nick and GPT copy Paste Work##################################################
    
# Define your functions
def get_embedding(programs):
    return torch.stack([model.encode(p, convert_to_tensor=True) for p in programs])

def calculate_similarities(room_name, _programs_embedding):
    input_embedding = model.encode(room_name, convert_to_tensor=True)
    input_embedding = input_embedding.unsqueeze(0)  # Ensure it's a 2D tensor
    similarities = util.pytorch_cos_sim(input_embedding, _programs_embedding)
    top_results = torch.topk(similarities, k=3, dim=1, largest=True, sorted=True)
    return top_results.indices[0].tolist(), top_results.values[0].tolist()

# Initialize your DataFrames
matches_df = pd.DataFrame(columns=['Original Room Name', 'Best Match', 'Best Match Score', 'Second Best', 'Second Best Score', 'Third Best', 'Third Best Score'])

# File uploaders
uploaded_classifier_file = st.file_uploader("Upload CSV with classifier/boring list", type=["csv"], key="classifier_uploader")
uploaded_room_names_file = st.file_uploader("Upload CSV with room names", type=["csv"], key="room_names_uploader")

# Processing the uploaded files
if uploaded_classifier_file and uploaded_room_names_file:
    classifier_df = pd.read_csv(uploaded_classifier_file)
    room_names_df = pd.read_csv(uploaded_room_names_file)
    
    # If both files are uploaded, process them
    boring_names = classifier_df['Boring Name'].tolist()
    boring_names_embeddings = get_embedding(boring_names)
    
    for index, row in room_names_df.iterrows():
        original_name = row['Original Room Name']
        best_match_indices, best_match_scores = calculate_similarities(original_name, boring_names_embeddings)
        
        # Add the new row to matches_df
        new_row_df = pd.DataFrame([{
            'Original Room Name': original_name,
            'Best Match': boring_names[best_match_indices[0]],
            'Best Match Score': best_match_scores[0],
            'Second Best': boring_names[best_match_indices[1]],
            'Second Best Score': best_match_scores[1],
            'Third Best': boring_names[best_match_indices[2]],
            'Third Best Score': best_match_scores[2]
        }])
        
        # Concatenate the new DataFrame to the matches_df DataFrame
        matches_df = pd.concat([matches_df, new_row_df], ignore_index=True)

    # Display the resulting DataFrame as a table in Streamlit, if not empty
    if not matches_df.empty:
        st.table(matches_df)
    
    
    ############################################end Nick and GPT work################################################

    